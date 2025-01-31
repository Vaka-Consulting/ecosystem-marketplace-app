import { OperatorType, SortType, WhereInput,  Args, buildMatchQuery, buildSortQuery, processWhereInput } from '../src/services/query.service';

describe('Query Service', () => {
  describe('buildMatchQuery', () => {
    it('should return an empty object when no conditions are provided', () => {
      const args: Args = { limit: 10, page: 0, and: [], or: [], sort: [] };
      expect(buildMatchQuery(args)).toEqual({});
    });

    it('should build a match query with AND conditions', () => {
      const args: Args = {
        limit: 10,
        page: 0,
        and: [
          { key: 'name', value: 'John', operator: OperatorType.EQUALS },
          { key: 'age', value: '30', operator: OperatorType.GREATER_THAN },
        ],
        or: [],
        sort: [],
      };
      expect(buildMatchQuery(args)).toEqual({
        $match: {
          $and: [
            { name: { $eq: 'John' } },
            { age: { $gt: 30 } },
          ],
        },
      });
    });

    it('should build a match query with OR conditions', () => {
      const args: Args = {
        limit: 10,
        page: 0,
        and: [],
        or: [
          { key: 'status', value: 'active', operator: OperatorType.EQUALS },
          { key: 'status', value: 'pending', operator: OperatorType.EQUALS },
        ],
        sort: [],
      };
      expect(buildMatchQuery(args)).toEqual({
        $match: {
          $or: [
            { status: { $eq: 'active' } },
            { status: { $eq: 'pending' } },
          ],
        },
      });
    });
  });

  describe('buildSortQuery', () => {
    it('should return an empty object when no sort conditions are provided', () => {
      const args: Args = { limit: 10, page: 0, and: [], or: [], sort: [] };
      expect(buildSortQuery(args)).toEqual({});
    });

    it('should build a sort query with ascending order', () => {
      const args: Args = {
        limit: 10,
        page: 0,
        and: [],
        or: [],
        sort: [{ by: 'name', type: SortType.ASC }],
      };
      expect(buildSortQuery(args)).toEqual({ $sort: { name: 1 } });
    });

    it('should build a sort query with descending order', () => {
      const args: Args = {
        limit: 10,
        page: 0,
        and: [],
        or: [],
        sort: [{ by: 'age', type: SortType.DESC }],
      };
      expect(buildSortQuery(args)).toEqual({ $sort: { age: -1 } });
    });

    it('should build a sort query with multiple sort conditions', () => {
      const args: Args = {
        limit: 10,
        page: 0,
        and: [],
        or: [],
        sort: [
          { by: 'name', type: SortType.ASC },
          { by: 'age', type: SortType.DESC },
        ],
      };
      expect(buildSortQuery(args)).toEqual({ $sort: { name: 1, age: -1 } });
    });
  });

  describe('processWhereInput', () => {
    it('should process EQUALS operator', () => {
      const where: WhereInput = { key: 'name', value: 'John', operator: OperatorType.EQUALS };
      expect(processWhereInput(where)).toEqual({ name: { $eq: 'John' } });
    });

    it('should process GREATER_THAN operator', () => {
      const where: WhereInput = { key: 'age', value: '30', operator: OperatorType.GREATER_THAN };
      expect(processWhereInput(where)).toEqual({ age: { $gt: 30 } });
    });

    it('should process IN operator', () => {
      const where: WhereInput = { key: 'status', values: ['active', 'pending'], operator: OperatorType.IN };
      expect(processWhereInput(where)).toEqual({ status: { $in: ['active', 'pending'] } });
    });

    it('should process REGEX_MATCH operator', () => {
      const where: WhereInput = { key: 'name', value: 'John', operator: OperatorType.REGEX_MATCH };
      expect(processWhereInput(where)).toEqual({ name: { $regex: 'John' } });
    });

    it('should return null for unsupported operator', () => {
      const where: WhereInput = { key: 'name', value: 'John', operator: 'UNSUPPORTED' as OperatorType };
      expect(processWhereInput(where)).toBeNull();
    });
  });
});