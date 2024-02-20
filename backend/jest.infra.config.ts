import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        `<rootDir>/test/infra/**/*test.ts`
    ]
};

export default config;