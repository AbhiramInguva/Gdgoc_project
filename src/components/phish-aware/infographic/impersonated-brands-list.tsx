import { Badge } from '@/components/ui/badge';
import { Globe, Package } from 'lucide-react';

interface BrandData {
  rank: number;
  brand: string;
}

interface ImpersonatedBrandsListProps {
  data: BrandData[];
}

const BrandIcon = ({ brand }: { brand: string }) => {
    const brandIcons: { [key: string]: string } = {
        'Microsoft': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
        'Google': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        'Amazon': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
        'Netflix': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2015_N_logo.svg/2560px-Netflix_2015_N_logo.svg.png'
    };

    if (brandIcons[brand]) {
        return <img src={brandIcons[brand]} alt={brand} className="h-6 w-6 object-contain" />;
    }
    
    if (brand === 'DHL / FedEx') {
        return <Package className="h-6 w-6 text-muted-foreground" />;
    }

    return <Globe className="h-6 w-6 text-muted-foreground" />;
};


export function ImpersonatedBrandsList({ data }: ImpersonatedBrandsListProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.rank} className="flex items-center justify-between p-3 bg-card/80 rounded-lg">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg">{item.rank}</Badge>
            <div className="flex items-center gap-2">
                <BrandIcon brand={item.brand} />
                <span className="font-semibold text-foreground">{item.brand}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
