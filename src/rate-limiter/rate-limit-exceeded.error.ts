import { HttpException, HttpStatus } from '@nestjs/common'

export class RateLimitExceededError extends HttpException {
  constructor(secondsUntilReset: number) {
    super(
      {
        status: HttpStatus.TOO_MANY_REQUESTS,
        error: `You have exceeded the limit of requests per hour. Try again in ${secondsUntilReset} seconds.`,
      },
      HttpStatus.TOO_MANY_REQUESTS
    )
  }
}
