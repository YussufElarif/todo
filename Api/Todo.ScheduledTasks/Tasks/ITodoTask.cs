using Microsoft.Extensions.Hosting;
using System;

namespace Todo.ScheduledTasks.Tasks
{
    public interface ITodoTask
    {
        void DoWork(int versionNumber);
    }
}
