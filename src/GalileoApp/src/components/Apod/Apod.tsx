import { Grid, Image, Group, Stack, ThemeIcon, Container, Text, Title, Paper, AspectRatio } from '@mantine/core';
import { useEffect, useState } from 'react'
import { IconRocket, IconCopyright } from '@tabler/icons-react';
import { fetchApodData } from '../../services/api';
import { ApodData } from '../../types';


export function Apod()
{
    const [apodData, setApodData] = useState<ApodData>();

    useEffect(() => {
        loadApodData();
    }, []);

    async function loadApodData() {
        const data = await fetchApodData();
        setApodData(data);    
    }

    const contents = apodData === undefined ? <></> :
      <Container mah={350} size="xl" py={20}>
            <Grid gutter={20} align="center">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Stack gap="xl">
                        <Group gap={"xs"}>
                            <ThemeIcon size="lg" radius="md" variant="transparent">
                            <IconRocket style={{ width: 20, height: 20 }} color="var(--mantine-primary-color-filled)" />
                            </ThemeIcon>
                            <Text fw={500} size="md" style={{ letterSpacing: 1 }} tt="uppercase">
                                Astronomy Picture Of the Day
                            </Text>
                        </Group>


                        <Title order={1} size="h1">
                            {apodData.title}
                        </Title>

                        <Text size="sm" c="dimmed">
                            {new Date(apodData.date).toLocaleDateString("en-GB")}
                        </Text>

                        <Text size="xl" c="dimmed" maw={600}>
                            {apodData.explanation}
                        </Text>

                        {
                            !apodData.copyright ? 
                            <></> :
                            <Group gap={"xs"}>
                                <IconCopyright style={{ width: 20, height: 20 }} />
                                <Text size="xs" c="bold" maw={300}>
                                    {apodData.copyright}
                                </Text>
                            </Group>
                        }
                    </Stack>
                </Grid.Col>

                {apodData.mediaType === 'image' ? 
                <Grid.Col span={{ base: 12, md: 6 }} mih={320}>
                    <AspectRatio>
                        <Image
                            mih={320}
                            radius="md"
                            p="xs"
                            src={apodData.hdUrl} 
                            fit="contain"
                            ></Image>
                     </AspectRatio>
                </Grid.Col> : 
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Paper mih={320} p="s">
                        <iframe
                            src={apodData.url}
                            style={{ border: 0, width: '100%', minHeight: '450px' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Paper>
                </Grid.Col> }
            </Grid>
      </Container>
    return (contents);
}