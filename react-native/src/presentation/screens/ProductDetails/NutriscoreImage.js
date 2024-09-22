import NutriscoreA from '../../../assets/nutriscore/nutriscore_a.svg';
import NutriscoreB from '../../../assets/nutriscore/nutriscore_b.svg';
import NutriscoreC from '../../../assets/nutriscore/nutriscore_c.svg';
import NutriscoreD from '../../../assets/nutriscore/nutriscore_d.svg';
import NutriscoreE from '../../../assets/nutriscore/nutriscore_e.svg';

export default function NutriscoreImage({ nutriscore }) {
  const compute = () => {
    switch (nutriscore) {
      case 'a':
        return <NutriscoreA width={120} height={60} />;
      case 'b':
        return <NutriscoreB width={120} height={60} />;
      case 'c':
        return <NutriscoreC width={120} height={60} />;
      case 'd':
        return <NutriscoreD width={120} height={60} />;
      case 'e':
        return <NutriscoreE width={120} height={60} />;
      default:
        return <></>;
    }
  };

  return compute();
}
