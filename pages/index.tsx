import { isPlainObject, mapValues, valuesIn } from 'lodash';
import Head from 'next/head';
import { useState } from 'react';
import faker from 'faker';
import NumberInput from '../components/number-input';
import TextEditor from '../components/text-editor';

const categories = Object.keys(faker) as any;
const categoryMethods: { [category: string]: string[] } = {};

categories.forEach((category: string) => {
  const methods = Object.keys((faker as any)[category]);
  categoryMethods[category] = methods;
});

function Home() {
  const [schema, setSchema] = useState('');
  const [mockCount, setMockCount] = useState<number | null>(1);
  const [generatedMockData, setGeneratedMockData] = useState('');

  const handleLoadExample = () => {
    setSchema(
      JSON.stringify(
        {
          'click Generate mock data to generate a random first name':
            'name.firstName',
        },
        null,
        2,
      ),
    );
  };

  const handleGenerateMockData = () => {
    try {
      const parsedSchema = JSON.parse(schema);

      if (mockCount && isPlainObject(parsedSchema)) {
        setSchema(JSON.stringify(parsedSchema, null, 2));

        setGeneratedMockData(
          JSON.stringify(
            Array.from('x'.repeat(mockCount)).map(() =>
              mapValues(parsedSchema, (value) => {
                if (typeof value === 'string') {
                  const valueSplit = value.split('.');

                  if (valueSplit.length === 2) {
                    const category = valueSplit[0];

                    if (categories.includes(category)) {
                      const method = valueSplit[1];

                      if (categoryMethods[category].includes(method)) {
                        return (faker as any)[category][method]();
                      }
                    }
                  }
                }

                return value;
              }),
            ),
            null,
            2,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Data Mocker</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="max-w-screen-lg mx-auto mb-24 px-4">
        <h1 className="text-5xl font-extrabold my-6">Data Mocker</h1>

        <div className="my-6 flex-initial">
          <a
            href="https://www.npmjs.com/package/faker"
            target="_blank"
            className="underline p-2 rounded-md text-gray-500 bg-gray-100 shadow-sm outline-none duration-200 hover:text-gray-800 hover:bg-gray-200 focus:ring"
            rel="noreferrer"
          >
            Available Faker.js methods.
          </a>

          <button
            className="p-2 ml-4 rounded-md font-semibold text-gray-500 bg-gray-100 shadow-sm outline-none duration-200 hover:text-gray-800 hover:bg-gray-200 focus:ring"
            type="button"
            onClick={handleLoadExample}
          >
            Load example
          </button>
        </div>

        <TextEditor value={schema} onChange={(value) => setSchema(value)} />

        <div className="flex-initial mb-6">
          <NumberInput value={mockCount} onChange={setMockCount} />

          <button
            className={`rounded-xl p-4 ml-4 font-semibold duration-200 outline-none focus:ring shadow-sm ${
              mockCount
                ? 'text-white bg-yellow-400 hover:bg-yellow-500'
                : 'bg-gray-200 text-gray-400'
            }`}
            type="button"
            disabled={!mockCount}
            onClick={handleGenerateMockData}
          >
            Generate mock data
          </button>
        </div>

        <TextEditor value={generatedMockData} />
      </div>
    </>
  );
}

export default Home;
