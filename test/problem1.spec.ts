import { Matrix } from '../src/problem1/matrix';

let grid:Array<any>;

beforeAll(() => {
    grid = [
        [0, 16, 255],
        [8, 128, 32],
        [0, 0, 0]
    ];
});

describe('Matrix', () => {
    it('Test with k =1', () => {
        const obj = new Matrix();
        expect(obj.rotate(grid,1)).toEqual( [ 
            [ 0, 8, 0 ], 
            [ 0, 128, 16 ], 
            [ 0, 32, 255 ] 
        ]);
      });

      it('Test with k =0', () => {
        const obj = new Matrix();
        expect(obj.rotate(grid,0)).toEqual( [ 
            [0, 16, 255],
            [8, 128, 32],
            [0, 0, 0]
        ]);
      });

      it('Test with k =2', () => {
        const obj = new Matrix();
        expect(obj.rotate(grid,2)).toEqual( [ 
            [ 0, 0, 0 ], 
            [ 32, 128, 8 ], 
            [ 255, 16, 0 ] 
        ]);
      });

      it('Test with k =4', () => {
        const obj = new Matrix();
        expect(obj.rotate(grid,4)).toEqual( [ 
            [0, 16, 255],
            [8, 128, 32],
            [0, 0, 0]
        ]);
      });
});
