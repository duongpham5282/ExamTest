
#List of problems:
    - Problem 1
    - Problem 2
    - Problem 4

#Problem 1 Complexity

rotate() function:
 - Line {3} use Array.prototype.reverse, that will take O(n) complexity
 - Line {2} has a loop with O(n-1) complexity
 - Line {1} also has a loop with O(n-1) complexity
 - Line {4} is a recursion considered as an interation with O(m) complexity (m = k % 4)
So the complexity: O(m*n^3)
    The possible values of m
        If (k % 4) === 0 the complexity is O(1);
        If (k % 4) === 1 the complexity is O(n^3)
        If (k % 4) >= 2 the complexity is O(m*n^3) but the m is an interger and always within [0, 3] so the final complexity should be O(n^3)

How to run all the test suites with jest
    Run npm run test

Problem 2
    How to run:
       npm run prob2

Problem 4
    How to run:
       npm run prob4
