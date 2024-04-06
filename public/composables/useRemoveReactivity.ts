

function project(project: ProjectType) : ProjectType{
    return {...project, sections: [...project.sections.map(section => ({...section, tasks: [...section.tasks.map(task => ({...task}))]}))]}
}

export default {project}