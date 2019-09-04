import { RuleValidation } from "../common/validation/ruleValidation";
const prompts = require("prompts");
prompts.override(require("yargs").argv);
const { rules, bundles } = require("../common/constants");

export class BundleProcessing {

    private hasRule =  (ruleList, ruleIds) => {
        for (let rule of ruleIds) {
            if (ruleList.includes(rule)) {
                return true;
            }
        }
        return false;
    }
  // Calculate highest valued & approriate bundle
  calculateBundle = ({ age, student, income }) => {
    let satisfiedRules = rules.filter(rule => {
      return RuleValidation.isConditionMatched(rule, { age, student, income })
        .valid;
    });

    // Check debit card & return satisfied rules ids
    const satisfiedRulesIds = satisfiedRules
      .filter(
        rule =>
          rule.id !== 5 ||
          (rule.id === 5 &&
            this.hasRule(rule.includes, satisfiedRules.map(r => r.id)))
      )
      .map(r => r.id);

    const satisfiedBundles = bundles.filter(bundle => {
      if (
        RuleValidation.isConditionMatched(bundle, { age, student, income })
          .valid &&
        bundle.includes.every(elem => satisfiedRulesIds.indexOf(elem) > -1)
      ) {
        return true;
      }
      return false;
    });

    const highestValuedBundle = satisfiedBundles.reduce((prev, current) => {
      return prev.value > current.value ? prev : current;
    });

    return highestValuedBundle;
  };

  // Switch and validate new bundle
  switchBundle = (selectedBundle, recommendedBundle, response) => {
    let unusedRules = [],
      addinRules = [];

    selectedBundle.includes.map(rule => {
      if (!recommendedBundle.includes.includes(rule)) {
        addinRules.push(rule);
      }
    });

    recommendedBundle.includes.map(rule => {
      if (!selectedBundle.includes.includes(rule)) {
        unusedRules.push(rule);
      }
    });

    const validateNewBundle = [
      selectedBundle,
      rules.filter(r => addinRules.includes(r.id))
    ].map(rule => RuleValidation.isConditionMatched(rule, response));

    if (!validateNewBundle.filter(bundle => bundle.valid === false).length) {
      return {
        valid: true,
        addinRules,
        unusedRules
      };
    } else {
      let errorMsg = [];
      validateNewBundle.map(bundle => {
        if (!bundle.valid) {
          errorMsg = errorMsg.concat(bundle.errorMsg);
        }
      });
      return {
        valid: false,
        errorMsg
      };
    }
  };
}
