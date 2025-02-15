import { Grid, Image, Container, Divider, NavLink, Text, Title, Center, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconHome2 } from '@tabler/icons-react';

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
    <div style={{margin: 15}}>
        <Center>
            <Container>
                <NavLink
                    href="/"
                    label="Home"
                    leftSection={<IconHome2 size={16} stroke={1.5} />}
                />
            </Container>
        </Center>
        <Container fluid style={{margin: 15}}>
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
        </Container>
    </div>
    return (contents);
}