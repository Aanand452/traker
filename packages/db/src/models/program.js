import db from '../dbmodels';
import { v4 as uuidv4 } from 'uuid';
import ProgramApm1 from './programApm1'
import ProgramApm2 from './programApm2'
import ProgramLifecycle from './programLifecycle'
import ProgramIndustry from './programIndustry';
import ProgramSegment from './programSegment';
import ProgramPersona from './programPersona';
import { Op } from "sequelize";
import moment from "moment";

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

  static async getAllProgramsFullByUser(id, programsStartDate, programsEndDate) {
    try{
      let programStartDate = null;
      let programEndDate = null;
      if (!programsStartDate || !programsEndDate) {
        const year = moment().year();
        programStartDate = Number(`${year - 1}4`);
        programEndDate = Number(`${year}4`);
      } else {
        const regex = /[a-zA-Z]/g;
        programStartDate = programsStartDate.replace(regex, '');
        programEndDate = programsEndDate.replace(regex, '');
      }

      let program = await db.Program.findAll({
        order: [
          ['name', 'ASC'],
        ],
        where: {
            year_quarter: {
              [Op.between]: [programStartDate, programEndDate]
            }
        },
        raw : true
      });

      let region = await db.Region.findAll({ raw : true });

      let programData = Promise.all(program.map(async el => {
        let regionName = region.filter(item => el.targetRegion === item.regionId)[0] ?
          region.filter(item => el.targetRegion === item.regionId)[0].name : null;

        let lifecycles = await ProgramLifecycle.getProgramLifecycles(el.programId);
        lifecycles = lifecycles.map(lifecycle => ({id: lifecycle.lifecycleStageId, label: lifecycle.name}));

        let apm1s = await ProgramApm1.getProgramApm1s(el.programId);
        apm1s = apm1s.map(apm1 => ({id: apm1.apm1Id, label: apm1.name}));

        let apm2s = await ProgramApm2.getProgramApm2s(el.programId);
        apm2s = apm2s.map(apm2 => ({id: apm2.apm2Id, label: apm2.name}));

        let industry =  await ProgramIndustry.getProgramIndustries(el.programId);
        industry = industry.map(ind => ({id: ind.industryId, label: ind.name}));

        let segment =  await ProgramSegment.getProgramSegments(el.programId);
        segment = segment.map(seg => ({id: seg.segmentId, label: seg.name}));

        let persona = await ProgramPersona.getProgramPersonas(el.programId);
        persona = persona.map(per => ({id: per.personaId, label: per.name}));

        let year = el.year_quarter.toString().slice(0,4);
        let quarter = el.year_quarter.toString().slice(4,5);

        return {
          programId: el.programId,
          name: el.name,
          owner: el.owner,
          budget: el.budget,
          metrics: el.metrics,
          parentCampaignId: el.parentCampaignId,
          targetRegion: regionName,
          lifecycleStage: lifecycles,
          apm1: apm1s,
          apm2: apm2s,
          industry,
          segment,
          persona,
          customerMessage: el.customerMessage,
          otherKpis: el.otherKpis,
          year,
          quarter
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

  static async getProgramsByRegionId(id, programsStartDate, programsEndDate) {
    try{
      let programStartDate = null;
      let programEndDate = null;
      if (!programsStartDate || !programsEndDate) {
        const year = moment().year();
        programStartDate = Number(`${year - 1}4`);
        programEndDate = Number(`${year}4`);
      } else {
        const regex = /[a-zA-Z]/g;
        programStartDate = programsStartDate.replace(regex, '');
        programEndDate = programsEndDate.replace(regex, '');
      }
      let programs = await db.Program.findAll({
        where: {
          target_region: id,
          year_quarter: {
            [Op.between]: [programStartDate, programEndDate]
          }
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

      let lifecycles = await ProgramLifecycle.getProgramLifecycles(id);
      lifecycles = lifecycles.map(lifecycle => lifecycle.name);

      let apm1s = await ProgramApm1.getProgramApm1s(id);
      apm1s = apm1s.map(apm1 => apm1.name);

      let apm2s = await ProgramApm2.getProgramApm2s(id);
      apm2s = apm2s.map(apm2 => apm2.name);

      let industries = await ProgramIndustry.getProgramIndustries(id);
      industries = industries.map(ind => ind.name);

      let segments = await ProgramSegment.getProgramSegments(id);
      segments = segments.map(ind => ind.name);

      let personas = await ProgramPersona.getProgramPersonas(id);
      personas = personas.map(per => per.name);

      let regionName = region.filter(item => program.targetRegion === item.regionId)[0] ?
      region.filter(item => program.targetRegion === item.regionId)[0].name : null;

      program = {
        ...program,
        targetRegion: regionName,
        lifecycleStage: lifecycles,
        apm1: apm1s,
        apm2: apm2s,
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
      body.year_quarter = Number(`${body.year}${body.quarter}`);

      const program = await db.Program.create(body);

      body.apm1Id.length && await ProgramApm1.addNewProgramApm1s(body.programId, body.apm1Id);
      body.apm2Id && body.apm2Id.length && await ProgramApm2.addNewProgramApm2s(body.programId, body.apm2Id);
      body.lifecycleStageId && body.lifecycleStageId.length && await ProgramLifecycle.addNewProgramLifecycles(body.programId, body.lifecycleStageId);
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
      await ProgramApm2.removeProgramApm2s(id);
      await ProgramLifecycle.removeProgramLifecycles(id);
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
      body.year_quarter = Number(`${body.year}${body.quarter}`);

      await db.Program.update(body, {
        where: {
          program_id: id
        }
      });


      await ProgramApm1.removeProgramApm1s(id);
      await ProgramApm2.removeProgramApm2s(id);
      await ProgramLifecycle.removeProgramLifecycles(id);
      await ProgramIndustry.removeProgramIndustries(id);
      await ProgramSegment.removeProgramSegments(id);
      await ProgramPersona.removeProgramPersonas(id);

      body.apm1Id.length && await ProgramApm1.addNewProgramApm1s(id, body.apm1Id);
      body.apm2Id && body.apm2Id.length && await ProgramApm2.addNewProgramApm2s(id, body.apm2Id);
      body.lifecycleStageId && body.lifecycleStageId.length && await ProgramLifecycle.addNewProgramLifecycles(id, body.lifecycleStageId);
      body.industryId.length && await ProgramIndustry.addNewProgramIndustry(id, body.industryId);
      body.segmentId.length && await ProgramSegment.addNewProgramSegment(id, body.segmentId);
      body.personaId.length && await ProgramPersona.addNewProgramPersona(id, body.personaId);


      return await ProgramModel.getProgramById(id);
    } catch (err) {
      console.error('Error updating an program', err);
      return 'error';
    }
  }

  static async etlUpdateFYQ(id) {
    try {
      const program = await db.Program.findByPk(id, {
        raw : true
      });

      program.year_quarter = 20204

      await db.Program.update(program, {
        where: {
          program_id: id
        }
      });
    } catch {
      console.log('Error updating programs FYQ');
    }
  }

  static async logChanges(id, user, previous, program, method) {
    try {
      const keys = [
        'name',
        'owner',
        'budget',
        'metrics',
        'parentCampaignId',
        'customerMessage',
        'businessGoals',
        'otherKpis',
        'apm1',
        'apm2',
        'lifecycleStage',
        'industry',
        'segment',
        'persona',
        'targetRegion',
      ];
      const programLogId = uuidv4();
      let changes = [];

      keys.forEach(key => {
        if(program[key] !== previous[key]) {
          changes.push({
            field: key,
            from: previous[key],
            to: program[key],
          })
        }
      });

      const body = {
        programLogId,
        programId: id,
        userId: user,
        change: JSON.stringify(changes),
        changeDate: Date.now(),
        method,
      };

      const log = await db.ProgramLog.create(body);
      return log;
    } catch (err) {
      console.error('Error creating program Log', err);
      return 'error';
    }
  };
}

export default ProgramModel;
