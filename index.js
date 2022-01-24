#!/usr/bin/env node
const boxen = require('boxen');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const open = require('open');

// Clear the console
clear();

const generate = text => {
  const theme = {
    colors: [
      '#FFFFFF',
      '#7285B7',
      '#FF9DA4',
      '#FFC58F',
      '#FFEEAD',
      '#D1F1A9',
      '#99FFFF',
      '#BBDAFF',
      '#EBBBFF',
      '#718c00',
      '#c82829',
      '#3e999f',
      '#6796e6',
      '#cd9731',
      '#f44747',
      '#b267e6'
    ],
    background: '#002451',
    foreground: '#ffffff'
  };

  let horizontalLayout = 'default';
  let verticalLayout = 'default';
  let font = 'ANSI Shadow';

  let coloredData = '';
  let colorsIndex = 0;
  let data;

  try {
    data = figlet.textSync(text, {
      font: font,
      horizontalLayout: horizontalLayout,
      verticalLayout: verticalLayout
    });
  } catch (error) {
    return error;
  }
  for (let i = 0; i < data.length; i++) {
    let character = data.charAt(i);
    if (character !== '_') {
      if (
        data.charAt(i - 1) === '_' ||
        data.charAt(i - 1) === ' ' ||
        data.charAt(i - 1) === '.'
      ) {
        colorsIndex++;
        if (colorsIndex >= theme.colors.length) {
          colorsIndex = 0;
        }
      }
      coloredData += chalk
        .hex(theme.colors[colorsIndex])
        .bgHex(theme.background)(data.charAt(i));
    } else {
      coloredData += chalk.hex(theme.foreground).bgHex(theme.background)(
        data.charAt(i)
      );
    }
  }
  return coloredData;
};

let name;
if (process.stdout.columns >= 95) {
  name = chalk.bold(generate('                   Vinesh Rajpurohit ⬢'));
} else {
  name = chalk.bold.cyanBright('                   Vinesh Rajpurohit ⬢');
}

const data = {
  name: name,
  handle: chalk.white('@vinesh27'),
  title: chalk.hex('#6495ED')('Java and JavaScript Dev'),
  fact: chalk.hex('#00FFFF')('I love to work, and I like to contribute to open source!'),
  email: chalk.hex('#5887FF')('mailto:vinitrajpurohit00@gmail.com'),
  discord: chalk.hex('#44BBA4')('https://discord.com/users/693334006472769536'),
  twitter: chalk.hex('#55C1FF')('https://twitter.com/v_n1t'),
  github: chalk.hex('#E3DAFF')('https://github.com/vinesh27'),
  website: chalk.hex('#9FFFCB')('https://vinesh.codes [WIP]'),
  npx: chalk.hex('#06D6A0')('npx vinesh'),

  labelTitle:   chalk.hex('#6a8ed2').bold('       Title:'),
  labelFact:    chalk.hex('#2bfbaa').bold('    Fun Fact:'),
  labelEmail:   chalk.hex('#12c2e9').bold('       Email:'),
  labelTwitter: chalk.hex('#28DCD4').bold('     Twitter:'),
  labelGitHub:  chalk.hex('#C0BABC').bold('      GitHub:'),
  labelDiscord: chalk.hex('#7AE582').bold('     Discord:'),
  labelHashnode:chalk.hex('#A959FF').bold('    Hashnode:'),
  labelLinkedin:chalk.hex('#F8C537').bold('    Linkedin:'),
  labelWebsite: chalk.hex('#59FFC8').bold('     Website:'),
  labelCard:    chalk.hex('#76e600').bold('        Card:')
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelTitle}  ${data.title}`,
    ``,
    `${data.labelFact}  ${data.fact}`,
    ``,
    `${data.labelEmail}  ${data.email}`,
    `${data.labelTwitter}  ${data.twitter}`,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelDiscord}  ${data.discord}`,
    `${data.labelHashnode}  ${data.hashnode}`,
    `${data.labelLinkedin}  ${data.linkedin}`,
    `${data.labelWebsite}  ${data.website}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.bold(
      "Hi there! I'm Vinesh. I'm a Java & JavaScript Developer, Full stack"
    )}`,
    `${chalk.bold(
      'Web Developer and Homosapien (Shoutout to all my homosapien '
    )}`,
    `${chalk.bold(
      'friends) from India. I love to explore, learn, innovate and '
    )}`,
    `${chalk.bold(
      'build stuff! Feel free to toss me an email, Twitter DM or Discord DM'
    )}`,
    `${chalk.bold(
      'if you want to get in touch or collab!'
    )}`
  ].join('\n'),
  {
    margin: 1,
    padding: 1,
    float: 'center',
    borderStyle: 'bold',
    borderColor: 'blue'
  }
);

// Show the boxen
console.log(me);

// Show the tips
const tip = [
  `Tip: ${chalk.cyanBright.bold(
    'cmd/ctrl + click'
  )} on the links above to open them in your broswer.`,
  ''
];

if (process.stdout.columns < 95) {
  tip.push(
    ...[
      `Quick TIP: ${chalk.greenBright.bold(
        'Make your terminal wider to get an awesome art.'
      )}`,
      ''
    ]
  );
}

console.log(tip.join('\n'));

// Inquirer prompt
const prompt = inquirer.createPromptModule();

// Prompt questions
const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
      {
        name: `Toss me an ${chalk.blueBright.bold('email')}? 📩`,
        value: () => {
          open('mailto:vinitrajpurohit00@gmail.com');
          console.log(
            '\nLooking forward to hearing your message and replying to you!\n'
          );
        }
      },
      {
        name: `Visit my ${chalk.cyanBright.bold('site')}? [WIP] 🚀`,
        value: () => {
          open('https://vinesh.codes');
          console.log('\nThanks for the visit to my site!\n');
        }
      },
      {
        name: 'Exit 👋',
        value: () => {
          console.log('👋 Catch you later, Have a nice day!\n');
        }
      }
    ]
  }
];

// Handle prompts
prompt(questions).then(answer => answer.action());
