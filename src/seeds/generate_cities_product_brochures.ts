import City from '@models/city';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('./data.json');

export async function seed(): Promise<void> {
    for (const city of data.cities) {
        await City.query().insertGraph(city);
    }
}
