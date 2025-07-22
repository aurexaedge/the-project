import { NextResponse } from 'next/server';

export const response = (statusCode, message) => {
  return new NextResponse(JSON.stringify({ message: message }), {
    status: statusCode,
  });
};
