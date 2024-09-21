using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Volo.Abp.BackgroundJobs;

namespace Aled.Fakes.Repositories;

public class BackgroundJobBasicRepositoryFake : InMemoryBasicRepository<BackgroundJobRecord, Guid>, IBackgroundJobRepository
{
    public Task<List<BackgroundJobRecord>> GetWaitingListAsync(int maxResultCount, CancellationToken cancellationToken = new CancellationToken())
    {
        throw new NotImplementedException();
    }
}