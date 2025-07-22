import { NextResponse } from 'next/server';
import { unstable_noStore } from 'next/cache';

export const GET = async (req) => {
  //   return new NextResponse(
  //     JSON.stringify({ message: 'something went wrong here' }),
  //     { status: 400 }
  //   );

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

    //!
    // const res = await axios.post(
    //     'https://saphire.vercel.app/user/LM3uqViFKMXWYNM/',
    //     {
    //       bookName,
    //       bookId,
    //       clientId: 'wyttyr==',
    //     }
    //   );
    //!
    // const date = new Date();
    // return new NextResponse(JSON.stringify({ message: date }), {
    //   status: 200,
    // });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};
export const POST = async (req) => {
  try {
    const body = await req.json();

    // return new NextResponse(JSON.stringify({ message: 'baaaad!!' }), {
    //   status: 500,
    // });
    // return;
    const userData = {
      bookName: body.bookName,
      bookId: body.bookId,
      clientId: 'bW9iaQ==',
    };

    const todoResponse = await fetch(
      `https://blacky-server.vercel.app/user/LM3uqViFKMXWYNM`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }
    );

    if (!todoResponse.ok) {
      const errorData = await todoResponse.json();
      return new NextResponse(JSON.stringify({ message: errorData.message }), {
        status: 500,
      });
    }
    const response = await todoResponse.json();

    return new NextResponse(JSON.stringify({ message: 'success!!' }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};
