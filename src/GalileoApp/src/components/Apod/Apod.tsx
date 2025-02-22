import {
  Grid,
  Image,
  Group,
  Stack,
  ThemeIcon,
  Container,
  Text,
  Title,
  Paper,
  AspectRatio,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IconRocket, IconCopyright, IconCalendar } from "@tabler/icons-react";
import { fetchApodData } from "../../services/api";
import { ApodData } from "../../types";
import { DatePickerInput } from "@mantine/dates";

export function Apod() {
  const [apodData, setApodData] = useState<ApodData>();

  useEffect(() => {
    loadApodData(null);
  }, []);

  async function loadApodData(date: Date | null) {
    const data = await fetchApodData(date);
    setApodData(data);
  }

  const currentDate = new Date(new Date().toLocaleDateString());
  const minDate = new Date("1995-06-20");
  const contents =
    apodData === undefined ? (
      <></>
    ) : (
      <Container mah={350} size="xl" py={20}>
        <Grid gutter={20} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">
              <Group gap={"xs"}>
                <ThemeIcon size="lg" radius="md" variant="transparent">
                  <IconRocket
                    style={{ width: 20, height: 20 }}
                    color="var(--mantine-primary-color-filled)"
                  />
                </ThemeIcon>
                <Text
                  fw={500}
                  size="md"
                  style={{ letterSpacing: 1 }}
                  tt="uppercase"
                >
                  Astronomy Picture Of the Day
                </Text>
              </Group>

              <Title order={1} size="h1">
                {apodData.title}
              </Title>

              <DatePickerInput
                rightSection={<IconCalendar size={18} stroke={1.5} />}
                rightSectionPointerEvents="none"
                value={new Date(apodData.date)}
                onChange={async (date) => {
                  await loadApodData(date);
                }}
                maw="120px"
                maxDate={currentDate}
                minDate={minDate}
                variant="unstyled"
                radius="xs"
                size="xs"
              />

              <Text size="xl" c="dimmed" maw={600}>
                {apodData.explanation}
              </Text>

              {!apodData.copyright ? (
                <></>
              ) : (
                <Group gap={"xs"}>
                  <IconCopyright style={{ width: 20, height: 20 }} />
                  <Text size="xs" c="bold" maw={300}>
                    {apodData.copyright}
                  </Text>
                </Group>
              )}
            </Stack>
          </Grid.Col>

          {apodData.mediaType === "image" ? (
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
            </Grid.Col>
          ) : (
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper mih={320} p="s">
                <iframe
                  src={apodData.url}
                  style={{ border: 0, width: "100%", minHeight: "450px" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Paper>
            </Grid.Col>
          )}
        </Grid>

        <Text py={25} size="lg">
          Did you miss the previous picture of the day?
          <br />
          No worries! Just click on the calendar and select the date.
          <br />
          Data are available since June 20th, 1995
        </Text>
      </Container>
    );
  return contents;
}
