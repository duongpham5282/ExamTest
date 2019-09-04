import { UserInput } from "./userInput";
import { BundleProcessing } from "./bundleProcessing";
const prompts = require('prompts');
prompts.override(require('yargs').argv);
const colors = require('colors/safe');

const { rules, bundles } = require('../common/constants');

class Main {

  private _userInput: UserInput;
  private _bundleProcessing: BundleProcessing;

  constructor() {
    this._userInput = new UserInput();
    this._bundleProcessing = new BundleProcessing();
  }

  main = async () => {
    const response = await this._userInput.cliInput();
    const recommendedBundle = this._bundleProcessing.calculateBundle(response);

    console.log(colors.blue(
      `    * Recommended bundle for you: ${recommendedBundle.name}`
    ));

    const theRestBundles = bundles.filter(b => b.id !== recommendedBundle.id);

    const bundle = await prompts([
      {
        type: "select",
        name: "selected",
        message: "Please choose a bundle that you wanna switch to:",
        choices: theRestBundles.map(bundle => {
          return {
            title: bundle.name,
            value: bundle
          };
        })
      }
    ]);

    const switchedBundle = this._bundleProcessing.switchBundle(
      bundle.selected,
      recommendedBundle,
      response
    );
    if (switchedBundle.valid) {
      if (switchedBundle.addinRules.length) {
        console.log(colors.blue(
          `
    * Please add below products in order to switch bundle:
            `
        ));
        switchedBundle.addinRules.map(rule => {
          if (rules.map(r => r.id).includes(rule))
            console.log(colors.blue(
              `       -  ${rules.filter(r => r.id === rule)[0].name}`
            ));
        });
      }

      if (switchedBundle.unusedRules.length) {
        console.log(colors.blue(
          `
    * Please remove below products in order to switch bundle:
            `
        ));
        switchedBundle.unusedRules.map(rule => {
          if (rules.map(r => r.id).includes(rule))
            console.log(colors.blue(
              `       -  ${rules.filter(r => r.id === rule)[0].name}`
            ));
        });
      }
    } else {
      console.log(colors.red(
        `
    * You are not able to switch to this bundle due to below reasons:
                `
      ));
      switchedBundle.errorMsg.map(err => {
        console.log(colors.red(`       -  ${err}`));
      });
    }
  };
}

const main = new Main();
main.main();
