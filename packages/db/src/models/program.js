import db from '../dbmodels/';

class ProgramModel {
  static async getAllPrograms() {
    try{
      const program = await db.Program.findAll({attributes: ['program_id', ['name', 'label']]});
      
      return program;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }

  static async getAllProgramsFullByUser(id) {
    try{
      const programs = await db.Program.findAll({
        include: [
          {
            model: db.User,
            where: {user_id: id}
          },
          db.Region,
          db.LifecycleStage,
          db.APM1,
          db.APM2,
          db.Industry,
          db.Segment,
          db.Persona
        ],
      });
      
      const minProgram = programs.map(program => {
        return (
          {
            programId: program.programId,
            name: program.name,
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
            persona: program.Persona ? program.Persona.name : '',
            customerMessage: program.customerMessage,
            businessGoals: program.businessGoals,
          }
        )
      });

      return minProgram;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  }

  static async getProgramById(id) {
    try {
      const program = await db.Program.findByPk(id, {
        include: [db.User, db.Region, db.LifecycleStage, db.APM1, db.APM2, db.Industry, db.Segment, db.Persona]
      });

      return program;
    } catch (err) {
      console.error('Error getting program list', err);
    }
  };
}

export default ProgramModel;