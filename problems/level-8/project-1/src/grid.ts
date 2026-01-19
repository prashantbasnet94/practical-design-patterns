export type Point = { x: number; y: number };

export class Grid {
  private width: number;
  private height: number;
  private walls: Set<string> = new Set();

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  addWall(x: number, y: number): void {
    this.walls.add(`${x},${y}`);
  }

  isWall(x: number, y: number): boolean {
    return this.walls.has(`${x},${y}`);
  }

  isValid(x: number, y: number): boolean {
    return (
      x >= 0 && x < this.width && y >= 0 && y < this.height && !this.isWall(x, y)
    );
  }

  // TODO: Implement BFS or A* here
  findPath(start: Point, end: Point): Point[] | null {
    // Return array of points from start to end, or null if no path
    return null;
  }
}
