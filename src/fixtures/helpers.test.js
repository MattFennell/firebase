import * as helpers from './helpers';

const fixturesWithDuplicates = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood D',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    }
];

const fixturesWithUnsorted = [
    {
        teamOne: 'Collingwood Z',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood F',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood K',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    }
];

const fixturesWithMultipleLeagues = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'League One',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'League Two',
        isCup: false
    }
];

const fixturesWithDuplicateLeagues = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'League Two',
        isCup: false
    }
];

const fixturesWithUncompletedMatches = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: false,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: false,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'League Two',
        isCup: false
    }
];

const fixturesWithNonCollingwoodMatches = [
    {
        teamOne: 'Collingwood A',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: false,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Trevs',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: false,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Mildert',
        result: '1 - 2',
        teamTwo: 'Collingwood A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'League Two',
        isCup: false
    }
];

const fixturesWithSearchString = [
    {
        teamOne: 'pre abcdef after',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: false,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'St. Aidan\'s A',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: false,
        league: 'Premiership',
        isCup: false
    },
    {
        teamOne: 'Collingwood B',
        result: '1 - 2',
        teamTwo: 'abcdef and stuff',
        location: 'Rubber Crumb 1 (Old)',
        time: '12/10/2019 10:45',
        completed: true,
        league: 'League Two',
        isCup: false
    }
];

const myTeam = 'Collingwood A';

describe('Generates Collingwood teams from all fixtures correctly', () => {
    it('returns empty array', () => {
        expect(helpers.generateCollingwoodTeams([])).toEqual([]);
    });

    it('Removes duplicates', () => {
        expect(helpers.generateCollingwoodTeams(fixturesWithDuplicates)).toEqual([{
            id: 'Collingwood A',
            value: 'Collingwood A',
            text: 'Collingwood A'
        },
        {
            id: 'Collingwood D',
            value: 'Collingwood D',
            text: 'Collingwood D'
        }]);
    });

    it('Sorts teams by alphabet', () => {
        expect(helpers.generateCollingwoodTeams(fixturesWithUnsorted)).toEqual([{
            id: 'Collingwood F',
            value: 'Collingwood F',
            text: 'Collingwood F'
        }, {
            id: 'Collingwood K',
            value: 'Collingwood K',
            text: 'Collingwood K'
        },
        {
            id: 'Collingwood Z',
            value: 'Collingwood Z',
            text: 'Collingwood Z'
        }]);
    });
});

// ------------------------------------------------------------------------- //

describe('Generates Radio Options for filtering fixtures', () => {
    it('Includes All Leagues and my team whe non null', () => {
        expect(helpers.fixturesFilters(myTeam, fixturesWithMultipleLeagues)).toEqual([
            {
                radioLabel: 'My Team',
                value: myTeam
            },
            {
                radioLabel: 'All Leagues',
                value: 'All'
            },
            {
                radioLabel: 'Premiership',
                value: 'Premiership'
            },
            {
                radioLabel: 'League One',
                value: 'League One'
            },
            {
                radioLabel: 'League Two',
                value: 'League Two'
            }
        ]);
    });

    it('Does not show leagues multiple times', () => {
        expect(helpers.fixturesFilters(myTeam, fixturesWithDuplicateLeagues)).toEqual([
            {
                radioLabel: 'My Team',
                value: myTeam
            },
            {
                radioLabel: 'All Leagues',
                value: 'All'
            },
            {
                radioLabel: 'Premiership',
                value: 'Premiership'
            },
            {
                radioLabel: 'League Two',
                value: 'League Two'
            }
        ]);
    });

    it('Does not include my team when value is "No team set"', () => {
        expect(helpers.fixturesFilters('No team set', fixturesWithMultipleLeagues)).toEqual([
            {
                radioLabel: 'All Leagues',
                value: 'All'
            },
            {
                radioLabel: 'Premiership',
                value: 'Premiership'
            },
            {
                radioLabel: 'League One',
                value: 'League One'
            },
            {
                radioLabel: 'League Two',
                value: 'League Two'
            }
        ]);
    });

    it('Does not include my team when value is empty', () => {
        expect(helpers.fixturesFilters('', fixturesWithMultipleLeagues)).toEqual([
            {
                radioLabel: 'All Leagues',
                value: 'All'
            },
            {
                radioLabel: 'Premiership',
                value: 'Premiership'
            },
            {
                radioLabel: 'League One',
                value: 'League One'
            },
            {
                radioLabel: 'League Two',
                value: 'League Two'
            }
        ]);
    });
});

// ------------------------------------------------------------------------- //

describe('Filtering fixtures', () => {
    it('Does not remove any fixtures when league filter is all', () => {
        expect(helpers.filterFixtures(fixturesWithUncompletedMatches, 'All', false, false, ''))
            .toEqual([
                {
                    teamOne: 'Collingwood A',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    id: 'Collingwood A-St. Aidan\'s A'
                },
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    id: 'Collingwood B-St. Aidan\'s A'
                },
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: true,
                    league: 'League Two',
                    isCup: false,
                    id: 'Collingwood B-St. Aidan\'s A'
                }
            ]);
    });

    it('Selecting a league only returns fixtures in that league', () => {
        expect(helpers.filterFixtures(fixturesWithUncompletedMatches, 'League Two', false, false, ''))
            .toEqual([
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: true,
                    league: 'League Two',
                    isCup: false,
                    id: 'Collingwood B-St. Aidan\'s A'
                }
            ]);
    });

    it('Collingwood only removes non collingwood matches', () => {
        expect(helpers.filterFixtures(fixturesWithNonCollingwoodMatches, 'All', true, false, ''))
            .toEqual([
                {
                    teamOne: 'Collingwood A',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    id: 'Collingwood A-St. Aidan\'s A'
                },
                {
                    teamOne: 'Mildert',
                    result: '1 - 2',
                    teamTwo: 'Collingwood A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: true,
                    league: 'League Two',
                    isCup: false,
                    id: 'Mildert-Collingwood A'
                }
            ]);
    });

    it('Filtering by a upcoming only removes completed matches', () => {
        expect(helpers.filterFixtures(fixturesWithUncompletedMatches, 'All', false, true, ''))
            .toEqual([
                {
                    teamOne: 'Collingwood A',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    id: 'Collingwood A-St. Aidan\'s A'
                },
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    id: 'Collingwood B-St. Aidan\'s A'
                }
            ]);
    });

    it('Filtering by a search string includes both teamOne and teamTwo matches', () => {
        expect(helpers.filterFixtures(fixturesWithSearchString, 'All', false, false, 'abcdef'))
            .toEqual([
                {
                    teamOne: 'pre abcdef after',
                    result: '1 - 2',
                    teamTwo: 'St. Aidan\'s A',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: false,
                    league: 'Premiership',
                    isCup: false,
                    id: 'pre abcdef after-St. Aidan\'s A'
                },
                {
                    teamOne: 'Collingwood B',
                    result: '1 - 2',
                    teamTwo: 'abcdef and stuff',
                    location: 'Rubber Crumb 1 (Old)',
                    time: '12/10/2019 10:45',
                    completed: true,
                    league: 'League Two',
                    isCup: false,
                    id: 'Collingwood B-abcdef and stuff'
                }
            ]);
    });
});