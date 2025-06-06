import {searchPlayerByName} from '../../src/Stats/searchPlayer'
describe('searchPlayerByName() unit testing', ()=>{
    test('Search LeBron James by full_name',async ()=>{
        const player = await searchPlayerByName("LeBron-James");
        expect(player.id.toBe(2544))
    });
})
