﻿using Microsoft.EntityFrameworkCore;

namespace LendACarAPI.Helper;

public class MyPagedList<T>
{
    public T[] DataItems { get; set; }
    private MyPagedList(T[] items, int totalCount, int pageNumber, int pageSize)
    {
        TotalCount = totalCount;
        CurrentPage = pageNumber;
        PageSize = pageSize;
        TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        DataItems = items;
    }

    public int CurrentPage { get; }
    public int TotalPages { get; }
    public int PageSize { get; }
    public int TotalCount { get; }
    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    // Asynchronous Create method
    public static async Task<MyPagedList<T>> CreateAsync(IQueryable<T> source, MyPagingRequest pagingRequest, CancellationToken cancellationToken)
    {
        var totalCount = await source.CountAsync();
        var items = await source.Skip((pagingRequest.PageNumber - 1) * pagingRequest.PageSize).Take(pagingRequest.PageSize).ToArrayAsync(cancellationToken);
        
        return new MyPagedList<T>(items, totalCount, pagingRequest.PageNumber, pagingRequest.PageSize);
    }
}
public class MyPagingRequest
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}