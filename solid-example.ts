// The following interface shows an example of using SOLID principles.


// This interface defines the common behavior of all shapes that have an area
// Interface Segregation Principle (ISP) - it defines only the necessary behavior for its implementers
interface Shape {
  area(): number;
}

// This class implements the Shape interface and represents a rectangle with a width and a height
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  // The implementation of the area method for a rectangle is simply the width times the height
  // Liskov Substitution Principle (LSP) - it follows the contract (area method) specified by the Shape interface
  area(): number {
    return this.width * this.height;
  }
}

// This class implements the Shape interface and represents a circle with a radius
class Circle implements Shape {
  constructor(private radius: number) {}

  // The implementation of the area method for a circle is pi times the radius squared
  // Liskov Substitution Principle (LSP) - it follows the contract (area method) specified by the Shape interface
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

// This class takes an array of shapes and provides a method to calculate the sum of their areas
// Single Responsibility Principle (SRP) - it has only one reason to change: if the way to calculate the sum of shapes changes
// Dependency Inversion Principle (DIP) - it depends on the Shape interface (abstraction), not on concrete implementations
class AreaCalculator {
  constructor(private shapes: Shape[]) {}

  // The sum method iterates over the shapes and adds up their areas to get the total sum
  // Open-Closed Principle (OCP) - it is open for extension (new shapes can be added to the calculation) and closed for modification
  sum(): number {
    let sum = 0;
    for (const shape of this.shapes) {
      sum += shape.area();
    }
    return sum;
  }
}

// This class takes an instance of AreaCalculator and provides a method to print the sum of the areas of all shapes
// Single Responsibility Principle (SRP) - it has only one reason to change: if the way to print the sum of areas changes
// Dependency Inversion Principle (DIP) - it depends on the AreaCalculator abstraction, not on concrete implementations
class AreaPrinter {
  constructor(private calculator: AreaCalculator) {}

  // The print method calls the sum method of the calculator and prints the result to the console
  // Open-Closed Principle (OCP) - it is open for extension (new ways to print the result can be added) and closed for modification
  print(): void {
    const sum = this.calculator.sum();
    console.log(`Sum of the areas: ${sum}`);
  }
}

// Test the code...
const rectangle = new Rectangle(4, 5); // create a new Rectangle with width 4 and height 5
const circle = new Circle(3); // create a new Circle with radius 3

const calculator = new AreaCalculator([rectangle, circle]); // create a new AreaCalculator with the shapes array
const printer = new AreaPrinter(calculator); // create a new AreaPrinter with the calculator instance

printer.print(); // call the print method of the printer instance to print the sum of the areas to the console