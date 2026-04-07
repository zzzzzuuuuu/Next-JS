import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

async function getMovies() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&api_key=${process.env.TMDB_KEY}`,
      {
        next: { revalidate: 60 }
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    console.log('Movies data:', data.results);
    return data.results as Movie[];
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const movies = await getMovies();

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <h1 className="mb-8 text-3xl font-bold">🎬 상영 중 영화</h1>

      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map(movie => (
          <li
            key={movie.id}
            className="overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="aspect-2/3 w-full bg-zinc-800">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                  이미지 없음
                </div>
              )}
            </div>

            <div className="p-3">
              <p className="line-clamp-2 text-sm font-semibold">{movie.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

