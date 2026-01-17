import { readFileSync } from 'fs';
import { join } from 'path';
import { SimpleStorage$Type } from './simple-storage';

const file = readFileSync(join(__dirname, 'SimpleStorage.json'));

export const abi = JSON.parse(file.toString()).abi as SimpleStorage$Type['abi'];
