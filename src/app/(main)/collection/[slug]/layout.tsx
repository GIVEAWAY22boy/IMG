import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
 
  // Fetch data
  const { supabaseAdmin } = await import('../../../../lib/supabase-admin');
  
  const { data: image } = await supabaseAdmin
        .from("images")
        .select("*")
        .eq("id", slug)
        .single();
 
  if (!image) {
    return {
      title: "Not Found | MvjHub",
      description: "The requested asset could not be found."
    }
  }

  return {
    title: `${image.title} | MvjHub Premium Stock`,
    description: image.description || `Buy the premium ${image.title} stock image. Exclusive high-end editorial photography.`,
    openGraph: {
      title: `${image.title} | MvjHub Premium Stock`,
      description: image.description || `Buy the premium ${image.title} stock image. Exclusive high-end editorial photography.`,
      images: [
        {
          url: image.watermarked_url,
          width: 1200,
          height: 630,
          alt: image.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${image.title} | MvjHub Premium Stock`,
      description: image.description || `Buy the premium ${image.title} stock image. Exclusive high-end editorial photography.`,
      images: [image.watermarked_url],
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
