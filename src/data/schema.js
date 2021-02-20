import resumeSchema from 'resume-schema';

export const schema = resumeSchema.schema;

export const validate = () => {
  resumeSchema.validate(
    { name: 'Thomas' },
    function (err, report) {
      if (err) {
        console.error('The resume was invalid:', err);
        return;
      }
      console.log('Resume validated successfully:', report);
    },
    function (err) {
      console.error('The resume was invalid:', err);
    }
  );
};
