import ReportableError from './ReportableError';

export default class ValidationError extends ReportableError {
  constructor(message: unknown) {
    super(
      400,
      {
        type: 'validationError',
        details: message,
      }
    );
  }
}
