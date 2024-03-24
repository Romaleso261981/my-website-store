import { Button, SimpleGrid, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import classes from './SuccessCheckCode.module.css';

const SuccessCheckCode = () => {
  const { t } = useTranslation();
  return (
    <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
      <div>
        <Title className={classes.title}>{t('registration')}</Title>
        <Text c="dimmed" size="lg">
          {t('useAllFunction')}
        </Text>
        <Button variant="outline" size="md" mt="xl" className={classes.control}>
          {t('backHomeButton')}
        </Button>
      </div>
    </SimpleGrid>
  );
};

export default SuccessCheckCode;
