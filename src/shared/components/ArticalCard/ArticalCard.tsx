import { AspectRatio, Button, Card, Container, Flex, Image, SimpleGrid, Text } from '@mantine/core';
import type { FC } from 'react';

const oldKoef = 1;
const newKoef = 0.9;

import { useNavigate } from 'react-router-dom';

import classes from './ArticalCard.module.css';

type CardData = {
  id: string;
  title: string;
  image: string;
  code: string;
  cost: number;
  date: string;
};

type Props = {
  type?: string;
  data: CardData[];
};

export const ArticalCard: FC<Props> = ({ data, type }) => {
  const navigate = useNavigate();
  const cardDetail = (id: string) => {
    navigate(`${id}`);
  };
  const cards = data.map((article) => (
    <Card shadow="lg" key={article.id} p="md" radius="md" component="a" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.date}
      </Text>
      <Flex justify="flex-start" align="center">
        <Text c="dimmed" size="xs" mr={5} tt="uppercase" fw={700} mt="md">
          Код товару
        </Text>
        <Text c="dimmed" size="xl" tt="uppercase" fw={900} mt="md">
          {`${article.code}`}
        </Text>
      </Flex>
      <Flex className={classes.oldCostWrapper} direction="column">
        <Text className={classes.oldCostTitle}>Стара ціна</Text>
        <Flex direction="row" justify="flex-start" align="flex-end">
          <Text className={classes.oldCost} mr={20}>
            {(article.cost * oldKoef).toFixed(1)}
          </Text>
          <Text className={classes.oldCostUnion}>
            {type === 'eliteIronGate' ? 'грн/м2' : 'грн'}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" className={classes.newCostWrapper}>
        <Text
          className={
            classes.newCostTitle
          }>{`Акційна пропозиція знижка ${newKoef * 100 - 100} %`}</Text>
        <Flex direction="row" justify="flex-start" align="flex-end">
          <Text className={classes.newCost} mr={20}>
            {(article.cost * newKoef).toFixed(1)}
          </Text>
          <Text className={classes.newCostUnion}>
            {type === 'eliteIronGate' ? 'грн/м2' : 'грн'}
          </Text>
        </Flex>
      </Flex>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
      <Button onClick={() => cardDetail(article.id)} variant="filled">
        Замовити
      </Button>
    </Card>
  ));
  return (
    <Container size="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
};
