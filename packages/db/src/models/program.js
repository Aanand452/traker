import db from '../dbmodels/';
import { v4 as uuidv4 } from 'uuid';

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
      let apm1 = await db.APM1.findAll({ raw : true });
      let apm2 = await db.APM2.findAll({ raw : true });
      let industry = await db.Industry.findAll({ raw : true });
      let segment = await db.Segment.findAll({ raw : true });
      let persona = await db.Persona.findAll({ raw : true });

      let programData = program.map(el => {
        let regionName = region.filter(item => el.targetRegion === item.regionId)[0] ? 
          region.filter(item => el.targetRegion === item.regionId)[0].name : null;

        let lifecycleStageName =  lifecycleStage.filter(item => el.lifecycleStage === item.lifecycleStageId)[0] ? 
          lifecycleStage.filter(item => el.lifecycleStage === item.lifecycleStageId)[0].name : null;

        let apm1Name =  apm1.filter(item => el.apm1 === item.apm1Id)[0] ? 
          apm1.filter(item => el.apm1 === item.apm1Id)[0].name : null;

        let apm2Name =  apm2.filter(item => el.apm2 === item.apm2Id)[0] ? 
          apm2.filter(item => el.apm2 === item.apm2Id)[0].name : null;

        let industryName =  industry.filter(item => el.industry === item.industryId)[0] ? 
          industry.filter(item => el.industry === item.industryId)[0].name : null;

        let segmentName =  segment.filter(item => el.segment === item.segmentId)[0] ? 
          segment.filter(item => el.segment === item.segmentId)[0].name : null;

        let personaName =  persona.filter(item => el.persona === item.personaId)[0] ? 
          persona.filter(item => el.persona === item.personaId)[0].name : null;

        return {
          programId: el.programId,
          name: el.name,  
          owner: el.owner,
          budget: el.budget,
          metrics: el.metrics,
          parentCampaignId: el.parentCampaignId,
          targetRegion: regionName,
          lifecycleStage: lifecycleStageName,
          apm1: apm1Name,
          apm2: apm2Name,
          industry: industryName,
          segment: segmentName,
          persona: personaName,
          customerMessage: el.customerMessage
        }
      });
      
      return programData;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }

  static async getProgramById(id) {
    try {
      const program = await db.Program.findByPk(id, {
        include: [db.User, db.Region, db.LifecycleStage, db.APM1, db.APM2, db.Industry, db.Segment, db.Persona]
      });

      const minProgram = {
        programId: program.programId,
        owner: program.owner,
        budget: program.budget,
        metrics: program.metrics,
        parentCampaignId: program.parentCampaignId,
        targetRegion: program.Region ? program.Region.name : '',
        lifecycleStage: program.LifecycleStage ? program.LifecycleStage.name : '',
        apm1: program.APM1 ? program.APM1.name : '',
        apm2: program.APM2 ? program.APM2.name : '',
        industry: program.Industry ? program.Industry.name : '',
        segment: program.Segment ? program.Segment.name : '',
        persona: program.Persona ? program.Persona.name : ''
      }
      
      return minProgram;
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
      const user = await db.User.findByPk(body.userId);
      if(!user) throw new Error("User doesn't exists");

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
      

      body.programId = uuidv4();
      if(!body.programId) throw new Error("It was imposible to create a program");
      */

      body.targetRegion = body.regionId;
      body.lifecycleStage = body.lifecycleStageId;
      body.apm1 = body.apm1Id;
      body.apm2 = body.apm2Id;
      body.industry = body.industryId;
      body.segment = body.segmentId;
      body.persona = body.personaId;
      body.owner = user.username;

      const program = await db.Program.create(body);

      return program;
    } catch (err) {
      console.error('Error creating new program', err);
      return 'Error';
    }
  };

  static async deleteProgram(id) {
    try {
      const program = await db.Program.findByPk(id);
      await program.destroy();

      return program;
    } catch (err) {
      console.error('Error deleting program', err);
      return 'error';
    }
  }
}

export default ProgramModel;