"use strict";
const { transformPostmanToMockoon } = require('../transform');

const {
    Mockoon,
    Environment,
} = require("../lib/models/");

test('transforms tempplate postman file to expected mocktoon file', () => {
    const postman_mock_file = "./__tests__/postman.json"

    const fs = require("fs");
    const rawdata = fs.readFileSync(postman_mock_file);
    const postman = JSON.parse(rawdata);
    const mockoon = Mockoon();
    const env = Environment();

    transformPostmanToMockoon({ postman, mockoon, env });


    const expectedData = fs.readFileSync(postman_mock_file);

    const mockoon_output_file = "./__tests__/mockoon.json"
    const mockoon_output_data = JSON.parse(fs.readFileSync(mockoon_output_file));
    expect(mockoon).toMatchObject(mockoon_output_data);
});