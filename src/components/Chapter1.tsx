import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { PhotoGallery } from '@/entities';

export default function Chapter1() {
  const [photos, setPhotos] = useState<PhotoGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const result = await BaseCrudService.getAll<PhotoGallery>('photogallery', {}, { limit: 3 });
      setPhotos(result.items);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="timeline"
      className="relative min-h-screen flex items-center justify-center py-32 px-8"
      style={{
        background: 'linear-gradient(to bottom, rgba(230, 169, 184, 0.05), transparent)',
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
          <h2 className="font-heading text-5xl md:text-6xl text-primary mb-8">
            The Day Everything Changed
          </h2>
          <p className="font-paragraph text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
            When I first saw you, I didn't know you would become the most important person in my life.
          </p>
        </motion.div>

        {/* Floating Photo Frames */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20" style={{ minHeight: isLoading ? '400px' : 'auto' }}>
          {isLoading ? null : photos.length > 0 ? (
            photos.slice(0, 3).map((photo, index) => (
              <motion.div
                key={photo._id}
                initial={{ opacity: 0, y: 100, rotate: index % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{
                  y: -10,
                  rotate: index % 2 === 0 ? -2 : 2,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
              >
                <div
                  className="relative bg-background p-4 rounded-2xl border-2 border-primary/20 overflow-hidden"
                  style={{
                    boxShadow: '0 0 40px rgba(230, 169, 184, 0.3)',
                  }}
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={photo.photo || 'https://static.wixstatic.com/media/217bff_57f0d1f830c743a6a4994bac8b9b4166~mv2.png?originWidth=384&originHeight=512'}
                      alt={photo.caption || 'Memory photo'}
                      width={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {photo.caption && (
                    <p className="font-paragraph text-sm text-foreground/80 text-center mt-4">
                      {photo.caption}
                    </p>
                  )}
                  {/* Soft glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-soft-glow/10 rounded-2xl pointer-events-none"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="font-paragraph text-lg text-foreground/60">
                Loading our precious memories...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
