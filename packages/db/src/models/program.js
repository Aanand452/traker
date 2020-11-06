import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';
import ProgramApm1 from './programApm1';
import ProgramIndustry from './programIndustry';
import ProgramSegment from './programSegment';
import ProgramPersona from './programPersona';

class ProgramModel {
  static async getAllPrograms() {
    try{
      const program = await db.Program.findAll({
        attributes: ['program_id', ['name', 'label']],
        order: [
          ['name', 'ASC'],
        ],
      });

      return program;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }

  static async getAllProgramsFullByUser(id) {
    try{
      let program = await db.Program.findAll({
        order: [
          ['name', 'ASC'],
        ],
        raw : true
      });

      let region = await db.Region.findAll({ raw : true });
      let lifecycleStage = await db.LifecycleStage.findAll({ raw : true });
      let apm2 = await db.APM2.findAll({ raw : true });

      let programData = Promise.all(program.map(async el => {
        let regionName = region.filter(item => el.targetRegion === item.regionId)[0] ?
          region.filter(item => el.targetRegion === item.regionId)[0].name : null;

        let lifecycleStageName =  lifecycleStage.filter(item => el.lifecycleStage === item.lifecycleStageId)[0] ?
          lifecycleStage.filter(item => el.lifecycleStage === item.lifecycleStageId)[0].name : null;

        let apm1s = await ProgramApm1.getProgramApm1s(el.programId);
        apm1s = apm1s.map(apm1 => apm1.name);

        let apm2Name =  apm2.filter(item => el.apm2 === item.apm2Id)[0] ?
          apm2.filter(item => el.apm2 === item.apm2Id)[0].name : null;

        let industry =  await ProgramIndustry.getProgramIndustries(el.programId);
        industry = industry.map(ind => ind.name);

        let segment =  await ProgramSegment.getProgramSegments(el.programId);
        segment = segment.map(seg => seg.name);

        let persona = await ProgramPersona.getProgramPersonas(el.programId);
        persona = persona.map(per => per.name);

        return {
          programId: el.programId,
          name: el.name,
          owner: el.owner,
          budget: el.budget,
          metrics: el.metrics,
          parentCampaignId: el.parentCampaignId,
          targetRegion: regionName,
          lifecycleStage: lifecycleStageName,
          apm1: apm1s,
          apm2: apm2Name,
          industry,
          segment,
          persona,
          customerMessage: el.customerMessage,
          otherKpis: el.otherKpis
        }
      }));

      return programData;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }

  static async etlGetProgramByName(name) {
    try {
      let program = await db.Program.findAll({
        where: {
          name: name
        },
        raw : true
      });

      if(program.length) return program[0].programId;
      else return false;
    } catch (err) {
      //thrown an error or save into log file
      //console.error('ETL: Error getting program list', name);
    }
  };

  static async getProgramsByRegionId(id) {
    try{
      let programs = await db.Program.findAll({
        where: {
          target_region: id
        },
        order: [
          ['name', 'ASC'],
        ]
      });

      if(!programs) throw new Error('Error getting program list');

      return programs;
    } catch (err) {
      console.error(err);
    }
  }

  static async getProgramById(id) {
    try {
      let program = await db.Program.findByPk(id, {
        raw : true,
        order: [
          ['name', 'ASC'],
        ]
      });

      let region = await db.Region.findAll({ raw : true });
      let lifecycleStage = await db.LifecycleStage.findAll({ raw : true });

      let apm1s = await ProgramApm1.getProgramApm1s(id);
      apm1s = apm1s.map(apm1 => apm1.name);

      let industries = await ProgramIndustry.getProgramIndustries(id);
      industries = industries.map(ind => ind.name);

      let segments = await ProgramSegment.getProgramSegments(id);
      segments = segments.map(ind => ind.name);

      let personas = await ProgramPersona.getProgramPersonas(id);
      personas = personas.map(per => per.name);

      let apm2 = await db.APM2.findAll({ raw : true });

      let regionName = region.filter(item => program.targetRegion === item.regionId)[0] ?
      region.filter(item => program.targetRegion === item.regionId)[0].name : null;

      let lifecycleStageName =  lifecycleStage.filter(item => program.lifecycleStage === item.lifecycleStageId)[0] ?
      lifecycleStage.filter(item => program.lifecycleStage === item.lifecycleStageId)[0].name : null;

      let apm2Name =  apm2.filter(item => program.apm2 === item.apm2Id)[0] ?
      apm2.filter(item => program.apm2 === item.apm2Id)[0].name : null;


      program = {
        ...program,
        targetRegion: regionName,
        lifecycleStage: lifecycleStageName,
        apm1: apm1s,
        apm2: apm2Name,
        industry: industries,
        segment: segments,
        persona: personas,
      };

      return program;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  };

  static async etlAddNewProgram(body) {
    try {
      body.programId = uuidv4();
      if(!body.programId) throw new Error("It was imposible to create a program");
      const program = await db.Program.create(body);

      return program;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  static async addNewProgram(body) {
    try {
      /*
      const region = await db.Region.findByPk(body.regionId);
      if(!region) throw new Error("Region doesn't exists");

      const lifecycleStage = await db.LifecycleStage.findByPk(body.lifecycleStageId);
      if(!lifecycleStage) throw new Error("Lifecycle Stage doesn't exists");

      const apm1 = await db.APM1.findByPk(body.apm1Id);
      if(!apm1) throw new Error("APM1 doesn't exists");

      const apm2 = await db.APM2.findByPk(body.apm2Id);
      if(!apm2) throw new Error("APM2 doesn't exists");

      const industry = await db.Industry.findByPk(body.industryId);
      if(!industry) throw new Error("Industry doesn't exists");

      const segment = await db.Segment.findByPk(body.segmentId);
      if(!segment) throw new Error("Segment doesn't exists");

      const persona = await db.Persona.findByPk(body.personaId);
      if(!persona) throw new Error("Persona doesn't exists");
      */

      body.programId = uuidv4();
      if(!body.programId) throw new Error("It was imposible to create a program due to an id error");

      body.targetRegion = body.regionId;
      if(body.lifecycleStageId) body.lifecycleStage = body.lifecycleStageId;
      if(body.apm2Id) body.apm2 = body.apm2Id;

      const program = await db.Program.create(body);

      body.apm1Id.length && await ProgramApm1.addNewProgramApm1s(body.programId, body.apm1Id);
      body.industryId.length && await ProgramIndustry.addNewProgramIndustry(body.programId, body.industryId);
      body.segmentId.length && await ProgramSegment.addNewProgramSegment(body.programId, body.segmentId);
      body.personaId.length && await ProgramPersona.addNewProgramPersona(body.programId, body.personaId);

      return program;
    } catch (err) {
      console.error('Error creating program', err);
      if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeForeignKeyConstraintError')
        return 'ValidationError';
      return 'Error';
    }
  };

  static async deleteProgram(id) {
    try {
      const program = await db.Program.findByPk(id);
      await program.destroy();

      await ProgramApm1.removeProgramApm1s(id);
      await ProgramIndustry.removeProgramIndustries(id);
      await ProgramSegment.removeProgramSegments(id);
      await ProgramPersona.removeProgramPersonas(id);

      return program;
    } catch (err) {
      console.error('Error deleting program', err);
      return 'error';
    }
  }

  static async updateProgram(id, body) {
    try{
      body.targetRegion = body.regionId;
      body.lifecycleStage = body.lifecycleStageId;
      body.apm2 = body.apm2Id;

      await db.Program.update(body, {
        where: {
          program_id: id
        }
      });

      await ProgramApm1.removeProgramApm1s(id);
      await ProgramIndustry.removeProgramIndustries(id);
      await ProgramSegment.removeProgramSegments(id);
      await ProgramPersona.removeProgramPersonas(id);

      body.apm1Id.length && await ProgramApm1.addNewProgramApm1s(id, body.apm1Id);
      body.industryId.length && await ProgramIndustry.addNewProgramIndustry(id, body.industryId);
      body.segmentId.length && await ProgramSegment.addNewProgramSegment(id, body.segmentId);
      body.personaId.length && await ProgramPersona.addNewProgramPersona(id, body.personaId);

      return await db.Program.findByPk(id);
    } catch (err) {
      console.error('Error updating an program', err);
      return 'error';
    }
  }
}

export default ProgramModel;
