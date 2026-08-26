import Link from "next/link";

export default function AdminPagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-between text-sm">
      {page > 1 ? (
        <Link
          href={`${basePath}?page=${page - 1}`}
          className="rounded-full border border-eden-gold/40 px-4 py-2 font-medium text-eden-green"
        >
          ← Précédent
        </Link>
      ) : (
        <span />
      )}
      <span className="text-eden-ink/60">
        Page {page} sur {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`${basePath}?page=${page + 1}`}
          className="rounded-full border border-eden-gold/40 px-4 py-2 font-medium text-eden-green"
        >
          Suivant →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
