export class Matrix {
    
     rotate = (grid:Array<any>, k:number) :Array<any>  => {
        k %= 4;
        if (k === 4 || k === 0) return grid;
        const rotated = grid.map((g, i) => { // {1}
            const dummy = [];
            for (let j = 0; j < grid.length; j++) { // {2}
                dummy.push(grid[j][i])
            }
            return dummy.reverse() // {3}
        });
       return this.rotate(rotated, k - 1); // {4}
    }
}
