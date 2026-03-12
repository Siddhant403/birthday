import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { PhotoGallery } from '@/entities';

export default function Chapter4() {
  const [photos, setPhotos] = useState<PhotoGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const result = await BaseCrudService.getAll<PhotoGallery>('photogallery', {}, { limit: 8 });
      setPhotos(result.items);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="memories"
      className="relative min-h-screen py-32 px-8"
      style={{
        background: 'linear-gradient(to bottom, rgba(230, 169, 184, 0.03), rgba(216, 191, 216, 0.05))',
      }}
    >
      <div className="max-w-[100rem] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-secondary mb-8">
            Our Best Memories
          </h2>
          <p className="font-paragraph text-xl text-foreground/80">
            Every moment with you is a treasure
          </p>
        </motion.div>

        {/* Interactive Polaroid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" style={{ minHeight: isLoading ? '600px' : 'auto' }}>
          {isLoading ? null : photos.length > 0 ? (
            photos.map((photo, index) => (
              <motion.div
                key={photo._id}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: (index % 3 - 1) * 3 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -15,
                  rotate: (index % 3 - 1) * 5,
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="relative group cursor-pointer"
              >
                {/* Polaroid frame */}
                <div
                  className="bg-background p-4 pb-16 rounded-lg shadow-xl"
                  style={{
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <div className="aspect-square overflow-hidden rounded-sm">
                    <Image
                      src={photo.photo || 'https://static.wixstatic.com/media/217bff_973b3c5d61534ad990612dd0684d56a5~mv2.png?originWidth=384&originHeight=384'}
                      alt={photo.caption || 'Memory'}
                      width={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Caption on polaroid */}
                  <div className="absolute bottom-6 left-4 right-4">
                    <p className="font-paragraph text-sm text-foreground text-center">
                      {photo.caption || photo.momentDescription || 'A precious moment'}
                    </p>
                  </div>
                  {/* Soft glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-soft-gold-accent/0 group-hover:bg-soft-gold-accent/5 rounded-lg transition-all duration-300 pointer-events-none"
                    style={{
                      boxShadow: '0 0 0 rgba(218, 165, 32, 0)',
                    }}
                    whileHover={{
                      boxShadow: '0 0 30px rgba(218, 165, 32, 0.4)',
                    }}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="font-paragraph text-lg text-foreground/60">
                Creating our memory gallery...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
