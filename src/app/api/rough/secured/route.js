import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const GET = async (req) => {
  // const user = await getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // console.log(user);

  // if (!user || (user && !user.superUser)) {
  //   return new NextResponse(
  //     JSON.stringify({ message: 'something went wrong here' }),
  //     { status: 400 }
  //   );
  // }
  const session = await getServerSession(authOptions);
  // console.log('api session', session);

  if (!session || (session && !session.user.superUser)) {
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong here' }),
      { status: 400 }
    );
  }
  return new NextResponse(JSON.stringify({ message: 'working' }), {
    status: 200,
  });

  try {
    const getTodos = await fetch(
      `https://blacky-server.vercel.app/user/LM3uqViFKMXWYNM/bW9iaQ==`
    );

    if (!getTodos.ok) {
      const errorData = await getTodos.json();
      return new NextResponse(JSON.stringify({ message: errorData.message }), {
        status: 500,
      });
    }
    const response = await getTodos.json();

    return new NextResponse(JSON.stringify({ message: response }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};
