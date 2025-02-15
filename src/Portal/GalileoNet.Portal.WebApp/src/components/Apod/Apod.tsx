import { Grid, Box, Image, Group, Paper, Stack, ThemeIcon, Container, Divider, NavLink, Text, Title, Center, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconHome2, IconRocket, IconCopyright } from '@tabler/icons-react';

interface ApodData {
    title: string;
    explanation: string;
    mediaType: string;
    copyright: string;
    url: string;
    hdUrl: string;
    date: Date;
}

export function Apod()
{
    const [apodData, setApodData] = useState<ApodData>();

    useEffect(() => {
        loadApodData();
    }, []);

    async function loadApodData() {
        const response = await fetch('/api/apod/data');

        if (response.ok) {
            const data = await response.json();
            setApodData(data);
        }
    }

    const contents = apodData === undefined ? <></> :
    <Box style={{margin: 15}}>
        <Center>
            <Container>
                <NavLink
                    href="/"
                    label="Home"
                    leftSection={<IconHome2 size={18} stroke={1.5} />}
                />
            </Container>
        </Center>
        <Container size="xl" py={120}>
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

                    <Group gap={"xs"} justify="space-between" maw={600}>
                        <Title order={1} size="h1">
                            {apodData.title}
                        </Title>
                        <Text size="sm" c="dimmed">
                        {new Date(apodData.date).toLocaleDateString("en-GB")}
                        </Text>
                    </Group>

                    <Text size="xl" c="dimmed" maw={600}>
                        {apodData.explanation}
                    </Text>

                    <Group gap={"xs"}>
                        <IconCopyright style={{ width: 20, height: 20 }} />
                        <Text size="xs" c="bold" maw={300}>
                            Copyright: {apodData.copyright}
                        </Text>
                    </Group>
                    </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Image
                    mih={320}
                    radius="md"
                    p="xs"
                    src={apodData.hdUrl} 
                    fit="contain"
                    ></Image>
                </Grid.Col>
            </Grid>
      </Container>

        {/* <Container size="xl" py={120} style={{margin: 30}}>
            <Grid justify="center" align="flex-start">
                <Grid.Col span={8}>
                    <Image radius="md" src={apodData.hdUrl} fit="contain" />  
                </Grid.Col>
                <Grid.Col span={4}>
                    <Title order={1}>{apodData.title}</Title>
                    <Divider my="md" />
                    <Text size="md">{apodData.explanation}</Text>
                    <Divider my="md" />
                    <Text size="xs" fw={700}>Copyright: {apodData.copyright}, {apodData.date.toLocaleString("en-GB")}</Text>
                </Grid.Col>
            </Grid>
        </Container> */}
    </Box>
    return (contents);
}