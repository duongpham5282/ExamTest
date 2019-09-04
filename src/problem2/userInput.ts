const prompts = require('prompts');
prompts.override(require('yargs').argv);
const colors = require('colors');

export class UserInput {
    
    cliInput = async () => {
        const response = await prompts([
            {
                type: 'number',
                name: 'age',
                message: 'How old are you?',
            },
            {
                type: 'select',
                name: 'student',
                message: 'Are you student?',
                choices: [
                    { title: 'yes', value: true },
                    { title: 'no', value: false },
                ],
            },
            {
                type: 'number',
                name: 'income',
                message: 'How is your income?',
            }
        ]);
        console.log(`
        * Your information:
            - Age: ${response.age}
            - Student? ${response.student}
            - Income: ${response.income}
        `);
        return response;
    }
}
