import React from 'react';
import { useGetWords } from './api/Queries';

const WordsList: React.FC = () => {
  const { data, isLoading, isError, error } = useGetWords(1, 100);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Lista de palavras</h1>
        {data && data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((word) => (
              <li key={word.id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{word.word}</h2>
                <p>Phonemic: {word.phonemic}</p>
                <p>Created at: {new Date(word.created_at).toLocaleString()}</p>
                <p>Updated at: {new Date(word.updated_at).toLocaleString()}</p>
                <div>
                  <h3 className="text-lg font-semibold">Categories:</h3>
                  <ul className="list-disc pl-5">
                    {word.categories.map((category) => (
                      <li key={category.id}>
                        {category.category}: {category.description}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Meanings:</h3>
                  <ul className="list-disc pl-5">
                    {word.meanings.map((meaning) => (
                      <li key={meaning.id}>
                        <p>Meaning (PT): {meaning.meaning_pt}</p>
                        <p>Meaning (WW): {meaning.meaning_ww}</p>
                        <p>Comment (PT): {meaning.comment_pt}</p>
                        <p>Comment (WW): {meaning.comment_ww}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>nenhuma palavra encontrada</p>
        )}
      </div>
    </div>
  );
};

export default WordsList;
