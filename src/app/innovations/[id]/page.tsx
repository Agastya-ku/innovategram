import { initialInnovations } from '@/data/mockInnovations';
import InnovationDetailPage from './InnovationDetailClient';

export function generateStaticParams() {
  return initialInnovations.map(inv => ({
    id: inv.id,
  }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <InnovationDetailPage />;
}
