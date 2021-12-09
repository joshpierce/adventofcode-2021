import * as fs from 'fs';
import path from 'path';

const run09 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(
                __dirname.replace('\\scripts', '').replace('/scripts', ''),
                '/inputs/09.txt'
            )
        )
        .toString()
        .split(/\r?\n/);

    let grid = input.map((x) => {
        return x.split('').map(Number);
    });

    let lowPoints = grid.reduce((acc, val, idx) => {
        return [
            ...acc,
            ...val.reduce((acc2, val2, idx2) => {
                if (
                    (idx - 1 < 0 || val2 < grid[idx - 1][idx2]) && //up
                    (idx + 1 == grid.length || val2 < grid[idx + 1][idx2]) && //down
                    (idx2 - 1 < 0 || val2 < grid[idx][idx2 - 1]) && //left
                    (idx2 + 1 == val.length || val2 < grid[idx][idx2 + 1]) //right
                ) {
                    return [...acc2, [idx, idx2]];
                } else {
                    return acc2;
                }
            }, [] as number[][]),
        ];
    }, [] as number[][]);

    let sumOfRiskLevel = lowPoints.reduce((acc, val) => {
        return acc + grid[val[0]][val[1]] + 1;
    }, 0);

    console.log(`The sum of risk level of all low points is ${sumOfRiskLevel}`);

    const getBasinSize = (
        lowPoint: number[],
        basinPoints: { point: number[]; checked: boolean }[]
    ): number => {
        if (!basinPoints || basinPoints.length === 0) {
            basinPoints = [{ point: lowPoint, checked: false }];
        }
        let checkPoints = [...basinPoints.filter((p) => !p.checked)];

        checkPoints.forEach((p, px) => {
            // Check Up
            if (
                p.point[0] - 1 >= 0 &&
                grid[p.point[0] - 1][p.point[1]] < 9 &&
                basinPoints.filter(
                    (bp) =>
                        bp.point[0] == p.point[0] - 1 &&
                        bp.point[1] == p.point[1]
                ).length == 0
            ) {
                basinPoints = [
                    ...basinPoints,
                    { point: [p.point[0] - 1, p.point[1]], checked: false },
                ];
            }
            // Check Down
            if (
                p.point[0] + 1 < grid.length &&
                grid[p.point[0] + 1][p.point[1]] < 9 &&
                basinPoints.filter(
                    (bp) =>
                        bp.point[0] == p.point[0] + 1 &&
                        bp.point[1] == p.point[1]
                ).length == 0
            ) {
                basinPoints = [
                    ...basinPoints,
                    { point: [p.point[0] + 1, p.point[1]], checked: false },
                ];
            }
            // Check Left
            if (
                p.point[1] - 1 >= 0 &&
                grid[p.point[0]][p.point[1] - 1] < 9 &&
                basinPoints.filter(
                    (bp) =>
                        bp.point[0] == p.point[0] &&
                        bp.point[1] == p.point[1] - 1
                ).length == 0
            ) {
                basinPoints = [
                    ...basinPoints,
                    { point: [p.point[0], p.point[1] - 1], checked: false },
                ];
            }
            // Check Down
            if (
                p.point[1] + 1 < grid[0].length &&
                grid[p.point[0]][p.point[1] + 1] < 9 &&
                basinPoints.filter(
                    (bp) =>
                        bp.point[0] == p.point[0] &&
                        bp.point[1] == p.point[1] + 1
                ).length == 0
            ) {
                basinPoints = [
                    ...basinPoints,
                    { point: [p.point[0], p.point[1] + 1], checked: false },
                ];
            }
            let markPoint = basinPoints.find(
                (bp) => bp.point[0] == p.point[0] && bp.point[1] == p.point[1]
            );
            if (markPoint) {
                markPoint.checked = true;
            }
        });

        if (basinPoints.filter((bp) => !bp.checked).length === 0) {
            return basinPoints.length;
        } else {
            return getBasinSize(lowPoint, basinPoints);
        }
    };

    let basinSizes = lowPoints.map((lp) => {
        return getBasinSize(lp, []);
    });

    basinSizes.sort((a, b) => b - a);

    console.log(
        `The three largest basin sizes are ${basinSizes[0]}, ${
            basinSizes[1]
        }, and ${basinSizes[2]} for a multiplied answer of ${
            basinSizes[0] * basinSizes[1] * basinSizes[2]
        }`
    );
};

export { run09 };
