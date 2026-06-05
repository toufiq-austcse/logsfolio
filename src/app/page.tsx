/* eslint-disable @next/next/no-img-element */
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {getJSONData} from "@/lib/serverUtils";
import Link from "next/link";
import {
    EnvelopeClosedIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
    TwitterLogoIcon,
    GlobeIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

export default async function Home() {
    const data = await getJSONData();
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

    const experienceGroups = data.workExperience.reduce(
        (groups, exp) => {
            const last = groups[groups.length - 1];
            if (last && last.company === exp.company) {
                last.entries.push(exp);
            } else {
                groups.push({company: exp.company, entries: [exp]});
            }
            return groups;
        },
        [] as {company: string; entries: typeof data.workExperience}[]
    );

    return (
        <main>
            {/* Banner Section */}
            <section
                id="home"
                className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
            >
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    <div className="w-1/2 mx-auto lg:w-1/3">
                        <div className="mx-auto size-[280px] overflow-hidden rounded-full">
                            <Image
                                src={`${basePath}/assets/toufiq.png`}
                                width={720}
                                height={720}
                                quality={95}
                                priority
                                sizes="280px"
                                alt="Md. Toufiqul Islam"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter ">
                                Hey 👋, I&apos;m {data.personalInfo.name}
                            </h1>
                        </div>
                        <p className="max-w-[600px] text-gray-600 dark:text-gray-300 lg:text-lg">
                            {data.personalInfo.bio}
                        </p>
                        <div className="space-x-4">
                            <Link
                                target="_blank"
                                href={data.contactInfo.github}
                                prefetch={false}
                            >
                                <Button variant="secondary" size="icon">
                                    <GitHubLogoIcon className="h-4 w-4"/>
                                </Button>
                            </Link>

                            <Link
                                target="_blank"
                                href={data.contactInfo.linkedin}
                                prefetch={false}
                            >
                                <Button variant="secondary" size="icon">
                                    <LinkedInLogoIcon className="h-4 w-4"/>
                                </Button>
                            </Link>

                            <Link href={`mailto:${data.contactInfo.email}`}>
                                <Button variant="secondary" size="icon">
                                    <EnvelopeClosedIcon className="h-4 w-4"/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section
                id="experience"
                className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
            >
                <h2 className="font-bold text-3xl md:text-5xl mb-12">
                    Work Experience
                </h2>
                <div
                    className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
                    {experienceGroups.map((group) => {
                        const first = group.entries[0];
                        const oldest = group.entries[group.entries.length - 1];
                        const allTech = Array.from(new Set(group.entries.flatMap((e) => e.technologies)));

                        return (
                            <div key={group.company} className="grid gap-1 relative">
                                <div
                                    className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50"/>

                                <h4 className="text-xl font-medium">
                                    {first.companyWebsite ? (
                                        <Link
                                            href={first.companyWebsite}
                                            target="_blank"
                                            className="text-primary"
                                        >
                                            {group.company}
                                        </Link>
                                    ) : (
                                        <span>{group.company}</span>
                                    )}
                                </h4>
                                {first.companyIntro && (
                                    <p className="text-sm italic text-gray-600 dark:text-gray-300">
                                        {first.companyIntro}
                                    </p>
                                )}
                                <div className="text-gray-600 dark:text-gray-300">
                                    {oldest.startDate} - {first.endDate}
                                </div>
                                {allTech.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {allTech.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-4 grid gap-6 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                                    {group.entries.map((exp) => (
                                        <div key={exp.id}>
                                            <h5 className="font-medium">{exp.role}</h5>
                                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                {exp.startDate} - {exp.endDate}
                                            </div>
                                            <ul className="list-disc pl-4 text-sm text-gray-600 dark:text-gray-300">
                                                {exp.keyResponsibilities.map((resp) => (
                                                    <li key={resp}>{resp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Technical Skills Section */}
            <section
                id="skills"
                className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
            >
                <h2 className="font-bold text-3xl md:text-5xl mb-12">Technical Skills</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        {label: "Programming Languages", items: data.skills.languages},
                        {label: "Frameworks", items: data.skills.frameworks},
                        {label: "Databases", items: data.skills.databases},
                        {label: "Infrastructure Tools", items: data.skills.infrastructure},
                        {label: "CI/CD", items: data.skills.cicd},
                        {label: "Testing", items: data.skills.testing},
                        {label: "Monitoring", items: data.skills.monitoring},
                        {label: "Other Related Skills", items: data.skills.other},
                    ].map(({label, items}) => (
                        <div key={label}>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                                {label}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((item) => (
                                    <Badge key={item} variant="secondary">
                                        {item}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section
                id="projects"
                className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
            >
                <h2 className="font-bold text-3xl md:text-5xl mb-12">My Projects</h2>
                <div className="grid grid-cols-1 gap-4 lg:gap-6">
                    {data.projects.map((project) => (
                        <Card key={project.title} className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-1/3 p-2 flex items-center">
                                <Image
                                    src={`${basePath}${project.cover}`}
                                    alt="Project 1"
                                    height={200}
                                    width={300}
                                    className="rounded-md object-cover"
                                />
                            </div>

                            <div className="w-full lg:w-2/3">
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <Badge key={tech} variant="secondary">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{project.description}</CardDescription>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex space-x-3">
                                        <Link
                                            target="_blank"
                                            href={project.live_url}
                                            prefetch={false}
                                        >
                                            <Button size="sm">
                                                <GlobeIcon className="h-3 w-3 mr-2"/>
                                                Live Demo
                                            </Button>
                                        </Link>
                                        <Link
                                            target="_blank"
                                            href={project.code_repo_url}
                                            prefetch={false}
                                        >
                                            <Button size="sm" variant="outline">
                                                <GitHubLogoIcon className="h-3 w-3 mr-2"/>
                                                Open Repository
                                            </Button>
                                        </Link>
                                    </div>
                                </CardFooter>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Education Section */}
            <section
                id="education"
                className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
            >
                <h2 className="font-bold text-3xl md:text-5xl mb-12">Education</h2>
                <div
                    className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20 grid gap-10">
                    {data.education.map((ed) => (
                        <div key={ed.id} className="grid gap-1 relative">
                            <div
                                className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-2 dark:bg-gray-50"/>

                            <h4 className="text-xl font-medium">{ed.degree}</h4>
                            <h5 className="font-medium">{ed.institution}</h5>
                            <div className="text-gray-600 dark:text-gray-300">
                                {ed.startDate} - {ed.endDate}
                            </div>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                                {ed.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            {data.visual.home.sections.testimonial && (
                <section
                    id="testimonials"
                    className="container max-w-5xl mx-auto py-12 md:py-16 lg:py-20"
                >
                    <h2 className="font-bold text-3xl md:text-5xl mb-12">Testimonials</h2>

                    <div className="grid grid-cols-1 gap-6">
                        {data.testimonials.map((t) => (
                            <Card className="w-full p-6 text-left" key={t.id}>
                                <blockquote
                                    className="whitespace-pre-wrap font-sans text-base leading-relaxed text-gray-700 dark:text-gray-200">
                                    &ldquo;{t.feedback}&rdquo;
                                </blockquote>
                                <div className="mt-4">
                                    <div className="font-semibold">
                                        {t.linkedin ? (
                                            <Link
                                                href={t.linkedin}
                                                target="_blank"
                                                className="hover:underline text-primary"
                                            >
                                                {t.name}
                                            </Link>
                                        ) : (
                                            t.name
                                        )}
                                    </div>
                                    <div className="text-base text-gray-600 dark:text-gray-300">
                                        {t.title} @ {t.company}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

        </main>
    );
}
