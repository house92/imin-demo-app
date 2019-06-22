import React from 'react';
import renderer from 'react-test-renderer';

import ResultScreen from '../../src/components/ResultScreen';

describe('test/components/ResultScreenTest.js', () => {
  it('renders correctly', () => {
    const TEST_SEARCH_RESULT = {
      name: 'Yoga',
      type: 'EventSeries',
      image: [
        {
          type: 'ImageObject',
          url: 'https://s3-eu-west-1.amazonaws.com/imin-default-images/classfinder/multi_fitness.jpg',
          thumbnail: [
            {
              type: 'ImageObject',
              url: 'https://images.weserv.nl?url=s3-eu-west-1.amazonaws.com/imin-default-images/classfinder/multi_fitness.jpg&h=180&w=180&q=80',
            },
            {
              type: 'ImageObject',
              url: 'https://images.weserv.nl?url=s3-eu-west-1.amazonaws.com/imin-default-images/classfinder/multi_fitness.jpg&h=150&w=150&t=square&a=attention&q=80',
              height: '150 px',
              width: '150 px',
            },
          ],
        },
      ],
      activity: [
        {
          id: 'https://openactive.io/activity-list#261395e5-9e11-4348-8bef-e0fafef0e765',
          type: 'Concept',
          prefLabel: 'Multi Fitness',
        },
      ],
      ageRange: {
        type: 'QuantitativeValue',
        maxValue: 55,
        minValue: 16,
      },
      isCoached: false,
      organizer: {
        name: 'Better',
        type: 'Organization',
      },
      identifier: 'gll-EventSeries-07fbaf9078b8a9a5a9320f8cb8e6cf2c16e034d9',
      'imin:level': [
        {
          name: 'Beginner',
          type: 'imin:BeginnerLevel',
        },
        {
          name: 'Intermediate',
          type: 'imin:IntermediateLevel',
        },
        {
          name: 'Advanced',
          type: 'imin:AdvancedLevel',
        },
      ],
      description: 'Loosen up and let go. Our mix of Yoga classes feature a range of exercises from energetic, full-body workouts to relaxing, more traditional poses.\r\nBetter for: Gaining peace of mind, improving overall strength and wellbeing.\r\nApprox. 280 calories per hour.',
      genderRestriction: 'oa:NoRestriction',
      isAccessibleForFree: false,
      subEvent: [
        {
          type: 'SessionSeries',
          category: [
            'Group Exercise Classes',
          ],
          location: {
            type: 'Place',
            id: '#/imin:locationSummary/26365755b17413e0b557b6245bb100918f774357',
          },
          subEvent: [
            {
              duration: 'PT60M',
              type: 'ScheduledSession',
              startDate: '2019-06-16T12:00:00Z',
              endDate: '2019-06-16T13:00:00Z',
            },
          ],
        },
      ],
      id: 'https://search.imin.co/events-api/v2/event-series/gll-EventSeries-07fbaf9078b8a9a5a9320f8cb8e6cf2c16e034d9',
      'imin:dataSource': {
        type: 'WebAPI',
        identifier: 'gll',
      },
      'imin:locationSummary': [
        {
          id: '#/imin:locationSummary/26365755b17413e0b557b6245bb100918f774357',
          geo: {
            type: 'GeoCoordinates',
            latitude: 51.5137,
            longitude: -0.214049,
            'imin:distanceFromGeoQueryCenter': {
              type: 'QuantitativeValue',
              value: 1.81,
              unitCode: 'KMT',
            },
          },
          url: 'https://better.org.uk/leisure-centre/kensington-and-chelsea/kensington-leisure-centre',
          name: 'Kensington Leisure Centre',
          type: 'Place',
          address: {
            type: 'PostalAddress',
            addressCountry: 'GB',
            'imin:fullAddress': 'Kensington Leisure Centre, Silchester Road, Kensington & Chelsea, W10 6EX',
          },
          telephone: '020 3793 8210'
        },
      ],
    };

    const tree = renderer.create(<ResultScreen result={TEST_SEARCH_RESULT} />).toJSON();
    expect(tree.children.length).toBe(5);
    expect(tree.children[0].type).toBe('Image');
    expect(tree.children[0].props.source.uri).toBe('https://images.weserv.nl?url=s3-eu-west-1.amazonaws.com/imin-default-images/classfinder/multi_fitness.jpg&h=150&w=150&t=square&a=attention&q=80');
    expect(tree.children[1].type).toBe('Text');
    expect(tree.children[1].children[0]).toBe('Yoga');
    expect(tree.children[2].type).toBe('View');
    expect(tree.children[2].children[0].type).toBe('Modal');
    expect(tree.children[3].type).toBe('View');
    expect(tree.children[3].children.length).toBe(1);
    expect(tree.children[3].children[0].type).toBe('Text');
    expect(tree.children[3].children[0].children[0]).toBe('13:00 16th Jun');
    expect(tree.children[4].type).toBe('Text');
    expect(tree.children[4].children[0]).toBe('Loosen up and let go. Our mix of Yoga classes feature a range of exercises from energetic, full-body workouts to relaxing, more traditional poses.\r\nBetter for: Gaining peace of mind, improving overall strength and wellbeing.\r\nApprox. 280 calories per hour.');
  });
});
