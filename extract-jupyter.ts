import * as fs from 'fs';

const usage = (): string => 'usage: node extract-jupyter.js some_file\n';

const getFilePath = (): string => {
  const filepath = process.argv[2];
  return filepath && fs.statSync(filepath).isFile() ? filepath : '';
};

const main = () => {
  const filepath = getFilePath();
  if (filepath === '') {
    process.stdout.write('Invalid path\n');
    process.stdout.write(usage());
    process.exit(1);
  }

  const json = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  process.stdout.write(json.cells.map((item: any): string => item.source.join('')).join('\n'));
};

main();
