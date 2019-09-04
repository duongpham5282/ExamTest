
export class RuleValidation {

    static isConditionMatched = (rule:any, { age, student, income }) => {
        let valid = true;
        let errorMsg = [];
    
        // Check age
        if (rule.age) {
            if (Array.isArray(rule.age)) {
                if (rule.age[0] >= age || rule.age[1] <= age) {
                    valid = false;
                    errorMsg.push('Age condition does not satisfy!');
                }
            } else {
                if (age <= rule.age) {
                    valid = false;
                    errorMsg.push('Age condition does not satisfy!');
                }
            }
        }
    
        // Check income
        if (rule.income && income <= rule.income) {
            valid = false;
            errorMsg.push('Income condition does not satisfy!');
        }
    
        // Check student
        if (rule.student && student !== rule.student) {
            errorMsg.push('Student condition does not satisfy!');
            valid = false;
        }
    
        return {
            valid,
            errorMsg
        };    
    }
}