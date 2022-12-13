/**@type{import('ts-jest/dist/types).InitalOptionsTsJest*/
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTretAsEm: [".ts"],
    globals: {
        "ts-jest": {
            useESM: true
        },
    },
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    }
}