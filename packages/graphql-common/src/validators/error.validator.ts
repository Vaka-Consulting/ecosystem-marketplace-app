/**
 * Custom error class representing an invalid status error.
 * Extends the built-in Error class to provide more specific error handling.
 */
export class InvalidStatusError extends Error {
  /**
   * Creates an instance of InvalidStatusError.
   * @param {string} message - The error message to be displayed.
   */
  constructor(message: string) {
    super(message); // Call the parent class (Error) constructor with the message.

    // Assign the error class name to the name property.
    this.name = this.constructor.name;

    // Capturing the stack trace retains the reference to the custom error class.
    Error.captureStackTrace(this, this.constructor);
  }
}
