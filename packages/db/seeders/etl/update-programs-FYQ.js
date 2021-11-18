import Program from '@sara/db/src/models/program';

const updatePrograms = async () => {
  const programs = await Program.getAllPrograms();

  programs.forEach(async program => {
    await Program.etlUpdateFYQ(program.dataValues.program_id);
  });
}

updatePrograms();
